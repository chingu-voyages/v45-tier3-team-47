declare module 'sequelize' {
  interface Transaction {
    get LOCK(): typeof LOCK;
  }
  enum LOCK {
    UPDATE = 'UPDATE',
    SHARE = 'SHARE',
    KEY_SHARE = 'KEY SHARE',
    NO_KEY_UPDATE = 'NO KEY UPDATE',
  }
}