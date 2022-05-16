import { ClientType } from "./../types";

export default (client): ClientType => {
  let connected = false;

  const sureConnected = () => {
    if (connected) return Promise.resolve();

    connected = true;
    return client.connect();
  };

  return {
    get(key, params) {
      return sureConnected().then(() => client.hGetAll(key, params));
    },
    set(key, params) {
      return sureConnected().then(() => client.hSet(key, params));
    },
    del(key) {
      return sureConnected().then(() => client.hDel(key))
    }
  };
};
