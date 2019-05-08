const amqp = require('amqplib');     // Import library amqp
const axios = require('axios');

//var message_json;
axios.get('http://localhost:3000/users')
    .then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        // console.log(response.status); // ex.: 200
        // message_json = response.data.message;

        amqp.connect('amqp://localhost')
            .then(conn => {
                return conn.createChannel().then(ch => {
                    const msg = response.data.values[0];
                    const array = response.data.values[1];

                    // Memanggil kurir 'queue1'
                    const queue1 = ch.assertQueue('queue1', { durable: false })

                    // Mengirim pesan ke kurir 'queue1'
                    ch.sendToQueue('queue1', Buffer.from(JSON.stringify(response.data.values[0])))
                    console.log('- Sent', msg)

                    // Memanggil kurir 'queue2'
                    const queue2 = ch.assertQueue('queue2', { durable: false })

                    // Mengirim pesan ke kurir 'queue2'
                    ch.sendToQueue('queue2', Buffer.from(JSON.stringify(response.data.values[1])))
                    console.log('- Sent', array)

                }).finally(() => {
                    //Tutup koneksi ke RabbitMQ setelah selesai menggunakan.
                    setTimeout(function () { conn.close(); }, 500);
                })
            }).catch(console.warn)
    });
