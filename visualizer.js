// function main() {
//     const canvas = document.getElementById('canvas')
//     const ctx = canvas.getContext('2d')
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight

//     class Bar {
//         constructor(x, y, width, height, color) {
//             this.x = x
//             this.y = y
//             this.height = height
//             this.width = width
//             this.color = color
//         }

//         update(micInput) {
//             const sound = micInput * 2500;
//             if (sound > micInput) this.height = sound;
//             else this.height -= this.height * 0.01
//         }

//         draw(ctx, micInput) {
//             const sound = (micInput * 3000);
//             ctx.fillStyle = this.color

//             // ctx.fillRect(this.x, this.y - this.height / 2, this.width, this.height)

//             ctx.strokeStyle = this.color
//             ctx.beginPath();
//             ctx.roundRect(this.x, this.y - this.height / 2, this.width, this.height, 200);
//             ctx.stroke();
//             ctx.fill()
            
//             // ctx.strokeStyle = this.color
//             // ctx.beginPath()
//             // ctx.moveTo(this.x, this.y)
//             // ctx.lineTo(this.x, this.y - (this.height + sound) / 2)
//             // ctx.stroke()
            
//             // ctx.strokeStyle = this.color
//             // ctx.beginPath();
//             // ctx.arc(this.x, this.y + (this.height + sound) / 2, this.width, this.height + sound, 100);
//             // ctx.stroke();
//         }
//     }

//     const microphone = new Microphone();
    
//     const bars = []
//     const barWidth = canvas.width / 256;

//     function createBars() {
//         for (let i = 0; i < 256; i++) {
//             bars.push(new Bar(i * barWidth, canvas.height / 2, 1, 100, 'purple'))
//         }
//     }

//     createBars()

//     function animate() {
//         if (microphone.initialized) {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
            
//             const volume = microphone.getVolume();
//             const samples = microphone.getSamples();
            
//             bars.forEach((bar, index) => {
//                 bar.update(samples[index])
//                 bar.draw(ctx, samples[index])
//             })
//         }
//         requestAnimationFrame(animate)
//     }
//     animate()
// }




// -------------------------------------------

function main() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Bar {
        constructor(x, y, width, height, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
        }

        update(micInput) {
            // const sound = micInput * 2500;
            // if (sound > micInput) this.height = sound;
            // else this.height -= this.height * 0.01
        }

        draw(ctx, micInput) {
            const sound = (micInput * 3000);
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y - (this.height + sound) / 2, this.width, this.height + sound)

        }
    }

    const microphone = new Microphone();
    
    const bars = []
    const barWidth = canvas.width / 256;

    function createBars() {
        for (let i = 0; i < 256; i++) {
            bars.push(new Bar(i * barWidth, canvas.height / 2, 1, 100, 'purple'))
        }
    }

    createBars()

    function animate() {
        if (microphone.initialized) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const volume = microphone.getVolume();
            const samples = microphone.getSamples();
            
            bars.forEach((bar, index) => {
                bar.update(samples[index])
                bar.draw(ctx, samples[index])
            })
        }
        requestAnimationFrame(animate)
    }
    animate()
}
