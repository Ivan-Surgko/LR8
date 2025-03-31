console.log("--- Частина І: Створення класу об'єктів ---");

// Клас Students
class Students {
    constructor(options) {
        this.name = options.name;
        this.surname = options.surname;
        this.group = options.group;
        this.course = options.course;
    }

    // Метод для генерації HTML представлення студента
    getStudentHtml() {
        return `<li><strong>Студент:</strong> ${this.name} ${this.surname}<br><strong>Група:</strong> ${this.group}, <strong>Курс:</strong> ${this.course}</li>`;
    }

    // Старий метод для консолі (можна залишити для налагодження)
    displayInfo() {
        console.log(`Студент: ${this.name} ${this.surname}, Група: ${this.group}, Курс: ${this.course}`);
    }
}

// ----- Відображення студентів на сторінці -----
const studentListElement = document.getElementById('student-list');
studentListElement.innerHTML = ''; // Очистити повідомлення "Завантаження..."

// Створення об'єктів класу Students
const students = [
    new Students({ name: 'Сергій', surname: 'Іванов', group: '27-КМ', course: 2 }),
    new Students({ name: 'Андрій', surname: 'Петров', group: '317-ІС', course: 3 }),
    new Students({ name: 'Олена', surname: 'Сидоренко', group: '15-ЕК', course: 1 })
];

// Додавання студентів до списку на сторінці
students.forEach(student => {
    studentListElement.innerHTML += student.getStudentHtml();
    student.displayInfo(); // Виводимо також в консоль
});

console.log("\n--- Частина ІІ: Наслідування класів ---");

// Базовий клас Component
class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector);
        if (!this.$el) {
             console.error(`Елемент з селектором "${selector}" не знайдено.`);
        }
    }

    // Метод для приховування елемента (використовує CSS клас)
    hide() {
        if (this.$el) {
            this.$el.classList.add('hidden'); // Додаємо клас для анімації через CSS
            console.log(`Елемент "${this.$el.id}" приховано.`);
        }
    }

    // Метод для показу елемента (використовує CSS клас)
    show() {
         if (this.$el) {
            this.$el.classList.remove('hidden'); // Видаляємо клас
            console.log(`Елемент "${this.$el.id}" показано.`);
         }
    }

    setColor(color) {
        if (this.$el) {
            this.$el.style.backgroundColor = color; 
            console.log(`Колір фону елемента "${this.$el.id}" змінено на ${color}.`);
        }
    }

    // Перевірка, чи елемент видимий
    isVisible() {
        return this.$el && !this.$el.classList.contains('hidden');
    }
}

// Дочірній клас Box, що наслідує Component
class Box extends Component {
    constructor(options) {
        super(options.selector); // Виклик конструктора батьківського класу

        // Додавання власної логіки (стилізація при створенні)
        if (this.$el) {
            this.$el.style.width = options.width + 'px';
            this.$el.style.height = options.height + 'px';
            this.setColor(options.color);
            console.log(`Стилі застосовано до елемента "${this.$el.id}".`);
        }
    }
}


// Створення об'єкта box1 класу Box
const box1 = new Box({
    selector: '#box1',
    width: 300,
    height: 100,
    // color: 'lightblue' // Можна задати тут або використати значення з CSS
    color: 'var(--box-initial-bg)' // Використовуємо змінну CSS
});

// Отримання доступу до кнопок
const toggleBtn = document.getElementById('toggle-visibility-btn');
const changeColorBtn = document.getElementById('change-color-btn');

// Масив кольорів для кнопки зміни кольору
const colors = ['#a7f3d0', '#fecaca', '#bfdbfe', '#fde68a', '#e9d5ff'];
let currentColorIndex = 0;

// Обробник події для кнопки Сховати/Показати
toggleBtn.addEventListener('click', () => {
    if (box1.isVisible()) {
        box1.hide();
        toggleBtn.textContent = 'Показати'; // Змінити текст кнопки
        toggleBtn.classList.add('show');     // Додати клас для можливої іншої стилізації
    } else {
        box1.show();
        toggleBtn.textContent = 'Сховати'; // Повернути текст кнопки
        toggleBtn.classList.remove('show');  // Прибрати клас
    }
});

// Обробник події для кнопки Зміни кольору
changeColorBtn.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length; // Перехід до наступного кольору по колу
    box1.setColor(colors[currentColorIndex]);
});

// Встановлюємо початковий стан кнопки видимості
if (!box1.isVisible()) {
     toggleBtn.textContent = 'Показати';
     toggleBtn.classList.add('show');
}

console.log("\nОб'єкт box1 та елементи керування налаштовано.");