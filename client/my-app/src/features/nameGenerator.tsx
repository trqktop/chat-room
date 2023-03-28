export default function nameGenerator() {
    const firstNames = [
        ["Грязная", "Грязный"],
        ["Толстая", "Толстый"],
        ["Бешенная", "Бешенный"],
        ["Пьянная", "Пьянный"],
        ["Чудесная", "Чудесный"],
        ["Красивая", "Красивый"],
        ["Пыльная", "Пыльный"],
        ["Холодная", "Холодный"],
        ["Мокрая", "Мокрый"],
        ["Относительная", "Относительный"],
        ["Чистосердечная", "Чистосердечный"],
        ["Фееричная", "Фееричный"],
        ["Вялая", "Вялый"],
        ["Серая", "Серый"],
        ["Мармеладная", "Мармеладный"],
        ["Лаконичная", "Лаконичный"],
        ["Лакричная", "Лакричный"],
        ["Пустая", "Пустой"],
        ["Дикая", "Дикий"],
        ["Постная", "Постный"],
        ["Мятая", "Мятый"],
        ["Жирная", "Жирный"],
    ];
    const secondNames = [
        "Акула",
        "Псина",
        "Крошка",
        "Газировка",
        "Молекула",
        "Пивас",
        "Чехол",
        "Утюг",
        "Змея",
        "Машина",
        "Птичка",
        "Анаконда",
        "Мужик",
        "Картошка",
        "Котлетка",
        "Булочка",
        "Тиранозавр",
        "Сосиска",
        "Волк",
        "Хиромант",
        "Касатка",
        "Пес",
        "Блендер",
        "Блинчик",
        "Пончик",
        "Бананчик",
        "Жук",
        "Сударь",
        "Сударыня",
        "Константа",
        "Свин",
    ];

    function getDefinitionGender(name: any) {
        if (name.endsWith("а") || name.endsWith("я")) {
            return 0;
        }
        return 1;
    }

    function getRandomName(arr: any) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomName() {
        const firstName = getRandomName(firstNames);
        const secondName = getRandomName(secondNames);
        const gender = getDefinitionGender(secondName);
        return firstName[gender] + " " + secondName;
    }
    return randomName();
}
