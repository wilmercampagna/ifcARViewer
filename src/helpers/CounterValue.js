class Count {
    constructor(count) {
        this.count=count;
    }
    
    increment() {
        this.count+=0.1;
        this.count = Number(this.count.toFixed(2));
        console.log(this.count)
        return this.count;
    }
    
    decrement() {
        this.count-=0.1;
        this.count = Number(this.count.toFixed(2));
        console.log(this.count)
        return this.count;
    }
}

export default Count;