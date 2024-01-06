import { HOSTS, PORTS } from "@scheduler-shared/configs/defaults";

const Arena = require('bull-arena');
const Bee = require('bee-queue');

export const redis = () => {
  return {
    host: HOSTS.REDIS,
    port: PORTS.REDIS,
    db: 0
  }
}

export const arena = () => {
  return Arena({
    Bee,
    queues: [
      {
        name: "reminders",
        hostId: "Worker",
        type: 'bee',
        redis: redis()
      },
    ],
  }, {
    basePath: '/arena',
    disableListen: true
  });

}
