class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }


    setAvailable(set) {
        this.available = set;
    }

}


class GoodsList {
    #goods = [];

    constructor() {
        this.filter = /[а-я]/gui;  // /[а-я]/gui;  /черн/gui;
        this.sortPrice = false;
        this.sortDir = true;
    }


    add(good) {
        this.#goods.push(good);
    }


    get list() {
        let sortList = []
        if (this.sortPrice == true) {    //проверяем сортировку по цене
            if (this.sortDir == true) {    //проверяем направление сортировки
                sortList = this.#goods.sort((a, b) => a.price > b.price ? 1: -1);//по возрастанию
                return sortList;
            } else {
                sortList = this.#goods.sort((a, b) => a.price > b.price ? -1: 1);  //по убыванию
                return sortList;
            }
        } else {
            sortList = this.#goods.sort((a, b) => a.name > b.name ? 1: -1).filter(  //сортировка по алфавиту  
                good => this.filter.test(good.name) == true  // учитываем RegEx из св-ва filter
                );  
            return sortList;
        }
    }


    remove(id) {
        this.#goods = this.#goods.filter(el => el['id'] != id)
        return this.#goods
    }
}


class BasketGood extends Good {
    constructor() {
        super();
        this.amount = 0;
    }
}


class Basket {
    constructor() {
        this.goods = [];
    }


    add(good, amount) {
        good['amount'] = amount;
        if (this.goods.length == 0) {
            this.goods.push(good);
        } else {
            let counter = 0;
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i]['id'] == good['id']) {
                    this.goods[i]['amount'] += good['amount'];
                    counter++;
                }
            }
            if (counter == 0) {
                this.goods.push(good);
            }
        }
        return this.goods;
    }


    remove(good, amount) {
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i]['id'] == good['id']) {
                this.goods[i]['amount'] -= amount;
                if (this.goods[i]['amount'] <= 0) {
                    this.goods.splice(i, 1);
                }
            }
        }
        return this.goods;
    }


    clear() {
        return this.goods = [];
    }


    removeUnavailable() {
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i]['available'] == false) {
                this.goods.splice(i, 1);
            }
        }
        return this.goods;
    }


    get totalAmount() {
        const total = this.goods.reduce(
            (accumulator, currentValue) => accumulator + currentValue['price'] * currentValue['amount'], 0
        );
        return `Итого: ${total}р.`
    }

    get totalSum() {
        let items = 0;
        this.goods.forEach(element => items += element['amount']);
        return `Общее количество товаров в корзине: ${items}шт.`
    }
}


const item1 = new Good(1, 'футболка красная', 'мужская, без принта, 100% хлопок', ['M', 'L', 'XL', 'XXL'], 1000, true);
const item2 = new Good(2, 'кофта серая', 'мужская, на молнии, 50% хлопок/50% полиэстер', ['M', 'L', 'XL', 'XXL'], 1500, true);
const item3 = new Good(3, 'ботинки синие', 'мужские, демисезонные, кожа', ['M', 'L', 'XL', 'XXL'], 2500, true);
const item4 = new Good(4, 'шапка черная', 'мужская, флисовая', ['M', 'L', 'XL', 'XXL'], 700, true);
const item5 = new Good(5, 'брюки черные', 'мужские, городской стиль', ['M', 'L', 'XL', 'XXL'], 2000, true);
const item6 = new Good(6, 'пуховик черный', 'мужской, набивка - синтепон', ['M', 'L', 'XL', 'XXL'], 5000, true);
const item7 = new Good(7, 'перчатки', 'флисовые со вставками для использования тачскрина', ['M', 'L', 'XL', 'XXL'], 800, true);

// item7.setAvailable(false);
// item2.setAvailable(false);
// console.log(item2, item7);


// const dataBase = new GoodsList();
// dataBase.add(item1);
// dataBase.add(item2);
// dataBase.add(item3);
// dataBase.add(item4);
// dataBase.add(item5);
// dataBase.add(item6);
// dataBase.add(item7);

// console.log(dataBase.remove(5));
// console.log(dataBase.remove(7));
// console.log(dataBase.list);

// item2.setAvailable(false);

const basketItem1 = new BasketGood(item3)
const basketItem2 = new BasketGood(item2)
const basketItem3 = new BasketGood(item5)

const basket = new Basket();
console.log(basket.add(item3, 2));
console.log(basket.add(item2, 3));
console.log(basket.add(item5, 6));

// basket.add(item5, 6);
// console.log(basket.add(item2, 3));
// console.log(basket.remove(item5, 12));
// console.log(basket.totalAmount);
// console.log(basket.totalSum);
// console.log(basket.removeUnavailable());
// console.log(basket.clear());