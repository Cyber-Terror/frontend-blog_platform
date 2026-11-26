# Blog Client (React Frontend)

Frontend-клиент для `blog-platform` (NestJS REST API).  
Проект сделан на React + TypeScript + Vite, со стилями Tailwind CSS.

## Стек

- React 19 + TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS v4
- react-hot-toast
- react-icons

## Что реализовано

- Регистрация и логин (`/auth/register`, `/auth/login`, `/auth/me`)
- Просмотр списка постов и отдельного поста
- Создание, редактирование, удаление постов (для автора)
- Загрузка изображения к посту (`POST /upload/file`)
- Комментарии к посту:
  - просмотр доступен всем
  - создание — только авторизованным
  - удаление — автор комментария или автор поста
  - подгрузка по 5 комментариев (`Load more`)
- Теги:
  - список тегов в сайдбаре
  - фильтрация постов по `?tag=...`
- Страница `My posts`
- Обработка состояний: loading/spinner, ошибки API, toast-уведомления
- Глобальные axios interceptors: `401` → logout+redirect `/login`, `429` → toast
- Страница `404`

## Требования

- Node.js 20+ (рекомендуется актуальный LTS)
- Запущенный backend `blog-platform`

## Переменные окружения

Создай `.env` в корне `fr_blog-client`:

```env
VITE_API_URL=http://localhost:3000
```

> Если backend задеплоен, укажи его URL в `VITE_API_URL`.

## Установка и запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Сборка и preview

```bash
npm run build
npm run preview
```

## Скрипты

- `npm run dev` — запуск dev-сервера
- `npm run build` — TypeScript build + production build Vite
- `npm run lint` — проверка oxlint
- `npm run preview` — локальный preview production-сборки

## Структура (основное)

```text
src/
  api/         # axios client + запросы auth/posts/comments/tags/upload
  components/  # UI-компоненты (Layout, Spinner, CommentList и т.д.)
  context/     # AuthContext
  pages/       # страницы роутинга
  types/       # общие TS-типы
```

## Важные заметки по API

- Ответы backend оборачиваются в `{ data, meta }`.
- Комментарии: чтение публичное, создание/изменение/удаление требуют Bearer token.
- Для загрузки изображений используется `FormData` с полем `file`.
