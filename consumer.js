const amqp = require('amqplib')     // Import library amqp

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            // Deklarasi antrian
            const queue1 = ch.assertQueue('queue1', { durable: false })
            if (queue1) {
                queue1.then(() => {
                    /* Menangkap pesan yang dikirimkan oleh RabbitMQ */
                    return ch.consume('queue1', msg => {
                        let json_data = JSON.parse(msg.content.toString());
                        console.log(json_data);
                        console.log(`His first name is ${json_data.first_name}`);
                        console.log(`His last name is ${json_data.last_name}`);
                    }, { noAck: true })
                })
                    .then(() => {
                        console.log('* Waiting for messages. Ctrl+C to exit')
                    })
            }

            // Deklarasi antrian
            const queue2 = ch.assertQueue('queue2', { durable: false })
            if (queue2) {
                queue2.then(() => {
                    /* Menangkap pesan yang dikirimkan oleh RabbitMQ */
                    return ch.consume('queue2', msg => {
                        let json_data = JSON.parse(msg.content.toString());
                        console.log(json_data)
                        console.log(`His first name is ${json_data.first_name}`);
                        console.log(`His last name is ${json_data.last_name}`);
                    }, { noAck: true })
                })
                    .then(() => {
                        console.log('* Waiting for messages. Ctrl+C to exit')
                    })
            }

        })
    }).catch(console.warn)