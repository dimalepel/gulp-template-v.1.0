# Bits consulting prod [ссылка](https://dimalepel.github.io/bits-consulting-prod/)

## Краткая инструкция по работе
### Для начала работы у вас должент быть установлен:
* Node.js v.14.15.0
* Gulp v4
* npm last version

## Основные команды для работы
* Установка - `npm i`
* Запуск локального сервера - `npm start`
* Сборка проекта без запуска локального сервера - `npm run-script build`
* Запуск тестирования на соответствия код-гайдам - `npm test`

## Все разработка ведёться в директории `source`
## Итоговый код попадает в директорию `build`

## Публикация проекта осуществляется на gh-pages через Travis CI
Ссылку на страницу опубликованного проекта получаем в настройках репозитория "Setings->GitHub Pages->Check it out here!->Your site is published at ..."

### Создаем GitHub-токен для деплоя из Travis CI
* Переходим на https://github.com/settings/tokens
* Жмем "Generate new token"
* Называем токен user-name/repo-name
* Отмечаем только "public_repo" (работает только для публичных репозиториев)
* или отмечаем только "repo" (работает также и для приватных репозиториев)
* Копируем токен

### Подключаем Travis CI
* Переходим на страницу https://travis-ci.com/ 
* Слева в колонке ищем свой репозиторий (обычно красного цвета, пока он не подключен)и выбираем его
* Жмем "More options->Setings" справа в углу
* Добавляем GitHub-токен в травис
* Перезапускаем сборку

### Добавляем GitHub-токен в травис
* Создаем в "Environment Variables"
  * Name: GITHUB_TOKEN
  * Value: Вставляем сгенерированный GitHub-токен
* Жмем "Add"

### Добавляем настройки деплоя в .travis.yml
* Создаем в проекте файл .travis.yml
* Добавляем секцию deploy
* Добавляем запуск сборки перед деплоем в секцию before_deploy
* Так как билд добавлен в .gitignore, необходимо переписать файл .gitignore

```
language: node_js

node_js:
  - "14.15.0"

before_deploy:
  - npm run build
  - echo -e "node_modules\npackage-lock.json" > .gitignore

deploy:
  provider: pages
  skip-cleanup: true
  local_dir: build
  github-token: $GITHUB_TOKEN
  keep-history: true
  on:
    branch: main

notifications:
  email: false
```
> В настройке `brunch` указываем ветку, из которой будем деплоить. На момент публикации темплейта, это ветка `main`. Ранее была `master`. [тыц](https://habr.com/ru/news/t/506876/)

Статья, на основе которой был настроен деплой проекта через Travis CI и gh-pages [здесь](https://vovanr.com/posts/deploy-gh-pages-with-travis-ci/)
