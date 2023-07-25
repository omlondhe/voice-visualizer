class Microphone {
    constructor() {
        this.initialized = false;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                this.audioContext = new AudioContext();
                this.microphone = this.audioContext.createMediaStreamSource(stream);
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 512; // must be power of 2 between 2^5 to 2^15, default = 2048
                const bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(bufferLength); // 0-255 i.e always half of fftSize
                this.microphone.connect(this.analyser);
                this.initialized = true;
            })
            .catch((error) => console.log(error))
    }

    getSamples() {
        this.analyser.getByteTimeDomainData(this.dataArray) // updates dataArray with new information
        const normalizedSamples = [ ...this.dataArray ].map((e) => e / 128 - 1);
        return normalizedSamples;
    }

    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray) // updates dataArray with new information
        const normalizedSamples = [ ...this.dataArray ].map((e) => e / 128 - 1);
        let sum = 0;
        for (let i = 0; i < normalizedSamples.length; i++) {
            sum += (normalizedSamples[i] * normalizedSamples[i]);
        }
        const volume = Math.sqrt(sum / normalizedSamples.length)
        return volume;
    }
}
