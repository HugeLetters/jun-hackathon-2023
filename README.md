# Important PSA

The complete project with backend was moved to `archive` branch - main branch now consists only of client code

# Team #12

[Женя](https://t.me/HugeLetters), [Вадим](https://t.me/pnkvnky) и [Настя](https://t.me/palmette)

# Stack

## Frontend

- JS/TS
- pnpm
- Svelte
- SvelteKit
- Melt-UI
- TailwindCSS
- TanStack Query + Svelte-Query

## Backend

- Python
- FastAPI
- PostgreSQL
- Docker
- Nginx

## Design

[Figma](https://www.figma.com/file/14IWGKKD2T9XmvJ7IkBZXK/%D0%94%D0%B6%D1%83%D0%BD-%D1%85%D0%B0%D0%BA%D0%B0%D1%82%D0%BE%D0%BD%3A-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0-%2312?type=design&node-id=0%3A1&mode=design&t=0GPo1EmlhcDVFA8D-1)

# Project info

## Charity Day Banners Builder

### Basic tasks

- [x] холст фиксированного размера, которому можно изменять цвет (либо из заданной палитры, либо устанавливать любой);

  - Холст фиксированный ~1400х780, можно выставлять цвет по системе HSL, выбирать из пресетов и градиентов, а также менять прозрачность.

  [Canvas Color.mov](https://github.com/HugeLetters/jun-hackathon/assets/119697239/406926b7-9006-4820-886e-d52be35829cf)

- [x] возможность создавать текстовые блоки, вводить пользовательский текст, кастомизировать его (цвет, жирность, начертание, размер, выравнивание, подчеркнутость) и размещать на холсте;

  - Весь этот функционал есть. Также у любых элементов можно менять слой, чтобы они отображались поверх других элементов и наоборот.

  [Text Element.webm](https://github.com/HugeLetters/jun-hackathon/assets/119697239/196694d7-ff8e-4619-8b23-f36ac2d96746)

- [x] возможность добавлять ссылки к тексту;
  - Как сказала Наталья если мы не делаем выгрузку в ПДФ, то вставка ссылок не нужна. Ну, технически, выгрузка в ПДФ у нас есть, но она работает не идеально.
- [x] возможность использовать заранее подготовленную вами графику по теме хакатона (например, иконки, которые вы заранее подготовите с flaticon и картинки с Freepik или unsplash), размещать ее на холсте и ресайзить;

  - Есть вкладка с 10 заготовленными картинками.

  [Image Element.webm](https://github.com/HugeLetters/jun-hackathon/assets/119697239/6de42cd1-e6b5-4825-8e5b-ee7ce9c011c6)

- [x] экспорт получившегося результата в виде картинки (JPG/PNG) и/или PDF;

  - Экспорт как изображение работает полноценно.
  - Экспорт как PDF работает но с ограничениями: не работает градиент, прозрачность, у текста слетает выравнивание.

  [Export File.webm](https://github.com/HugeLetters/jun-hackathon/assets/119697239/bbb06346-2ed9-4b1b-80b8-0ed484d0d757)

- [x] возможность очистить холст;
  - Сделано.

[Clear Canvas.webm](https://github.com/HugeLetters/jun-hackathon/assets/119697239/1f35b9fe-214e-4b4c-b7ce-0886b0e80020)

- [x] удобный, аккуратный, понятный дизайн;
  - Настя молодец :)

### Extra tasks

- [ ] аккаунты и авторизация;
- [ ] сохранение проектов:

  - [x] локальное кэширование: когда юзер открывает страницу, он видит текущий статус проекта, а не новый проект;
  - Прогресс постоянно сохраняется в localStorage и сохраняется между визитами и даже синхронизируется между вкладками(если это зачем-то кому-то нужно).

  [Persistent Canvas.webm](https://github.com/HugeLetters/jun-hackathon/assets/119697239/bc113961-428d-4403-9a0a-2c282fccf475)

  - [ ] сохранение проекта или проектов в ЛК аккаунта и возможность выбирать, какой проект редактировать;

- [ ] возможность отменять последние N действий в проекте, откатываться назад/вперед;
- [x] набор геометрических фигур для использования: кругов, треугольников, квадратов, прямоугольников, которым можно менять цвет, задавать прозрачность итд;

  - Есть три фигуры: круг, квадрат и треугольник. Их можно ресайзить, менять цвет и прозрачность.

  [Shape Element.webm](https://github.com/HugeLetters/jun-hackathon/assets/119697239/a16a95b7-0746-4493-a34e-553c1b92c4dd)

- [ ] адаптив и возможность создавать баннеры с планшета/телефона;
- [ ] интеграция Unsplash API/Flaticon API/еще каким-либо, чтобы юзер мог прямо из проекта искать картинки и сразу их всталять;
- [ ] интеграция Google Fonts API, чтобы юзер мог выбирать тип шрифта;
- [ ] возможность юзеру загружать свою графику для баннера (если аккаунт - опция сохранения графики в аккаунте для дальнейшего использования, но с ограничением размера хранилища и, опционально, возможностью удалять загруженное без удаления этой графики из проекта);
- [ ] возможность обрезки графики (чтобы можно было отрезать кусок);
- [ ] интеграция/реализация простой рисовалки с последующим размещением графики на баннере:
  - [ ] возможность рисовать (в одном цвете или нескольких);
  - [ ] возможность очистить;
  - [ ] вставка рисунка в баннер (с перемещением, масштабированием);
  - [ ] интеграция рисовалки в UI/UX приложения;
- [ ] возможность красиво пошарить свой результат в соцсетях;

### Crucial backend tasks

К сожалению, не хватило времени сделать интеграцию с бэкендом - тем не менее вот список сделанного функционала с этой стороны.

- [x] создать базу данных на хостинге render.com;
- [x] настроить сервер nginx;
- [x] связать базу данных с проектом;
- [x] настроить Docker контейтер;
- [x] организовать деплой на хостинг;
- [x] спроектировать структуру базы данных;
- [x] создать таблицы сущностей в базе данных;
- [ ] создать api для взаимодействия с backend:
- [x] crud для elements;
- [ ] crud для images;
- [ ] crud для texts;
- [ ] crud для projects;
- [ ] провести интеграцию frontend и backend;

# Deployment

## Local

```bash
# either
sudo docker compose up
# or
sudo bash run.sh


# You should also run this command to generate types for openAPI spec for the client.
cd client && pnpm run openapi
# You can use other package managers to run this command but pnpm is recommended
```

## Hosted

Hosted on Render.com - https://jun-hackathon.onrender.com/
Сайт может долго открываться, тк Рендер на бесплатном тарифе выклчюает контейнеры без активности и нужно время на то, чтобы они запустились обратно - занимает обычно 1-2 минуты
