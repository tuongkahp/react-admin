import moment from 'moment'

export const randomNumber = (min, max) => {
  return min + Math.trunc(Math.random() * (max - min));
}

export const sleep = m => new Promise(r => setTimeout(r, m))

export const formatDate = (dateTime) => {
  if (!dateTime) return ''

  return moment().format('yyyy/MM/DD HH:mm:ss');
}