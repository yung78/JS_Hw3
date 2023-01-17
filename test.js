class Test {
    #arr=[,]

    add(num){
        this.#arr.push(num)
        return this.#arr
    }

    del(index) {
        this.#arr.splice(index, 1)
        return this.#arr
    }
}

const person = new Test()
console.log(person.add(1))
console.log(person.add(2))
console.log(person.add(3))
console.log(person.add(4))
console.log(person.add(5))
console.log(person.del(3))