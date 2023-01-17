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


    add(id, name, description, sizes, price, available) {
        let good = new Good(id, name, description, sizes, price, available);
        this.#goods.push(good);
    }


    get list() {
        let sortList = []
        if (this.sortPrice == true) {    //проверяем сортировку по цене
            if (this.sortDir == true) {    //проверяем направление сортировки
                sortList = this.#goods.sort((good1, good2) => {  //по возрастанию
                    if (good1.price > good2.price) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                return sortList;
            } else {
                sortList = this.#goods.sort((good1, good2) => {  //по убыванию
                    if (good1.price > good2.price) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                return sortList;
            }
        } else {
            sortList = this.#goods.sort((good1, good2) => { //сортировка по алфавиту
                if (good1.name > good2.name) {
                    return 1;
                } else {
                    return -1;
                }
            }).filter(good => this.filter.test(good.name) == true);  // учитываем RegEx из св-ва filter
            return sortList;
        }
    }


    remove(id) {
        for (let i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i]['id'] == id) {
                this.#goods.splice(i, 1);
            }
        }
    }
}


class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, good, amount) {
        super(id, name, description, sizes, price, available);
        this.good = good;
        this.amount = amount;

    }
}


class Basket {
    constructor() {
        this.goods = [];
    }


    add(good, amount) {
        let basketGood = new BasketGood(
            good['id'],
            good['name'],
            good['description'],
            good['sizes'],
            good['price'],
            good['available'],
            good,
            amount
        );
        if (this.goods.length == 0) {
            this.goods.push(basketGood);
        } else {
            let counter = 0;
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i]['id'] == basketGood['id']) {
                    this.goods[i]['amount'] += basketGood['amount'];
                    counter++;
                }
            }
            if (counter == 0) {
                this.goods.push(basketGood);
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
        this.goods.splice(0, this.goods.length);
        return this.goods;
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

item7.setAvailable(false);
item2.setAvailable(false);
console.log(item2, item7);


const dataBase = new GoodsList();
dataBase.add(1, 'футболка красная', 'мужская, без принта, 100% хлопок', ['M', 'L', 'XL', 'XXL'], 1000, true);
dataBase.add(2, 'кофта серая', 'мужская, на молнии, 50% хлопок/50% полиэстер', ['M', 'L', 'XL', 'XXL'], 1500, true);
dataBase.add(3, 'ботинки синие', 'мужские, демисезонные, кожа', ['M', 'L', 'XL', 'XXL'], 2500, true);
dataBase.add(4, 'шапка черная', 'мужская, флисовая', ['M', 'L', 'XL', 'XXL'], 700, true);
dataBase.add(5, 'брюки черные', 'мужские, городской стиль', ['M', 'L', 'XL', 'XXL'], 2000, true);
dataBase.add(6, 'пуховик черный', 'мужской, набивка - синтепон', ['M', 'L', 'XL', 'XXL'], 5000, true);
dataBase.add(7, 'перчатки', 'флисовые со вставками для использования тачскрина', ['M', 'L', 'XL', 'XXL'], 800, true);

console.log(dataBase.list);
console.log(dataBase.remove(5));
console.log(dataBase.remove(2));
console.log(dataBase.list);


const basket = new Basket();
basket.add(item3, 2);
basket.add(item2, 2);
basket.add(item5, 6);
basket.add(item5, 6);
console.log(basket.add(item2, 3));
console.log(basket.remove(item5, 12));
console.log(basket.totalAmount);
console.log(basket.totalSum);
console.log(basket.removeUnavailable());
console.log(basket.clear());