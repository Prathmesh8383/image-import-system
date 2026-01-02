const amqp = require("amqplib");

const QUEUE_NAME = "image_import_queue";

async function publishMessage(message) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.sendToQueue(
    QUEUE_NAME,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );

  console.log("Job sent to queue:", message);

  await channel.close();
  await connection.close();
}

module.exports = { publishMessage };
