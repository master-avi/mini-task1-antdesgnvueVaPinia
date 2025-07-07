import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    login: 'Login',
    username: 'Username',
    password: 'Password',
    login_failed: 'Login failed! Use: admin / 1234',
    logout: 'Logout',
    posts: 'Posts',
    comments: 'Comments',
    likes: 'Likes',
    dashboard: 'My Dashboard',
    add: 'Add',
    send: 'Send',
    add_comment: 'Add a comment...',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    like: 'Like',
    liked: 'Liked',
  },
  uz: {
    login: 'Kirish',
    username: 'Foydalanuvchi nomi',
    password: 'Parol',
    login_failed: 'Kirish muvaffaqiyatsiz! admin / 1234 ni kiriting',
    logout: 'Chiqish',
    posts: 'Postlar',
    comments: 'Izohlar',
    likes: 'Yoqtirganlar',
    dashboard: 'Mening Panelim',
    add: 'Qo‘shish',
    send: 'Yuborish',
    add_comment: 'Izoh yozing...',
    view: 'Ko‘rish',
    edit: 'Tahrirlash',
    delete: 'O‘chirish',
    like: 'Yoqtirish',
    liked: 'Yoqtirilgan',
  },
  ru: {
    login: 'Войти',
    username: 'Имя пользователя',
    password: 'Пароль',
    login_failed: 'Ошибка входа! Введите admin / 1234',
    logout: 'Выход',
    posts: 'Посты',
    comments: 'Комментарии',
    likes: 'Понравившиеся',
    dashboard: 'Моя Панель',
    add: 'Добавить',
    send: 'Отправить',
    add_comment: 'Напишите комментарий...',
    view: 'Просмотр',
    edit: 'Редактировать',
    delete: 'Удалить',
    like: 'Нравится',
    liked: 'Понравившийся',
  }
}

const i18n = createI18n({
  locale: 'uz', // boshlang'ich til
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages
})

export default i18n
