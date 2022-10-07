import { MTypeTab, MTypeTabContent } from "config/stream-keys";
import { assert } from "lib/assert";
import { INVALID_SIGN_PARAMS, WALLET_IS_NOT_CONNECTED } from "lib/errors";
import { getFavicon } from "lib/favicon";
import { ContentMessage } from "lib/secure-message";
import { Subject } from "lib/subject";
import { TabStream } from "lib/tab-stream";
import { Transaction } from "lib/transaction";
import { TypeOf } from "lib/type";
import { uuidv4 } from "lib/uuid";
import { Account } from './account';
import { Network } from "./network";


export class Wallet {
  #account: Account;
  #network: Network;
  #stream: TabStream;
  #subject: Subject;

  #connected = false;
  #enabled = false;


  get account() {
    return this.#account;
  }

  get network() {
    return this.#network;
  }

  get connected() {
    return this.#connected;
  }

  get enabled() {
    return this.#enabled;
  }

  constructor(stream: TabStream, subject: Subject) {
    this.#stream = stream;
    this.#subject = subject;
    this.#account = new Account(subject);
    this.#network = new Network(subject);
    this.#subscribe();
  }

  connect(): Promise<boolean> {
    const type = MTypeTab.CONNECT_APP;
    const recipient = MTypeTabContent.CONTENT;
    const uuid = uuidv4();
    const title = window.document.title;
    const icon = getFavicon();
    const payload = {
      title,
      icon,
      uuid
    };

    new ContentMessage({
      type,
      payload
    }).send(this.#stream, recipient);

    return new Promise((resolve, reject) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.RESPONSE_CONNECT_APP) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload.reject) {
          obs();
          return reject(new Error(msg.payload.reject));
        }

        this.#connected = Boolean(msg.payload.resolve);

        this.#account = new Account(
          this.#subject,
          msg.payload.base58
        );

        obs();
        return resolve(this.connected);
      });
    });
  }

  async sign(arg: string | Transaction) {
    assert(this.connected, WALLET_IS_NOT_CONNECTED);

    if (TypeOf.isString(arg)) {
      return await this.#signMessage(String(arg));
    } else if (arg instanceof Transaction) {
      return await this.#signTransaction(arg);
    }

    throw new Error(INVALID_SIGN_PARAMS);
  }

  async #signMessage(message: string) {}

  async #signTransaction(tx: Transaction): Promise<string> {
    const type = MTypeTab.TX_TO_SEND;
    const recipient = MTypeTabContent.CONTENT;
    const uuid = uuidv4();
    const payload = {
      ...tx.payload,
      uuid,
      title: window.document.title,
      icon: getFavicon()
    };

    new ContentMessage({
      type,
      payload
    }).send(this.#stream, recipient);

    return new Promise((resolve, reject) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.TX_TO_SEND_RESULT) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload && msg.payload.reject) {
          obs();
          return reject(new Error(msg.payload.reject));
        }

        obs();
        return resolve(msg.payload.resolve as string);
      });
    });
  }

  #subscribe() {
    this.#subject.on((msg) => {
      switch (msg.type) {
        case MTypeTab.LOCKED:
          this.#enabled = msg.payload.enabled;
          break;
        case MTypeTab.ACCOUNT_CHANGED:
          this.#account = new Account(
            this.#subject,
            msg.payload.base58
          );
          break;
        case MTypeTab.GET_DATA:
          this.#account = new Account(
            this.#subject,
            msg.payload.base58
          );

          this.#enabled = msg.payload.enabled;
          this.#connected = msg.payload.connected;

          this.#network = new Network(
            this.#subject,
            msg.payload.net
          );
          break;
        case MTypeTab.NETWORK_CHANGED:
          this.#network = new Network(
            this.#subject,
            msg.payload.net
          );
          break;
        default:
          break;
      }
    });
  }
}
