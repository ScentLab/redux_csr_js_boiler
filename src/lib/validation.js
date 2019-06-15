const isEmpty = value => value === undefined || value === null || value === ''

const regEx = {
	date: /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,
	email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	name: /^[a-zA-Z가-힣]{2,30}$/,
	password: /^[0-9a-zA-Z!@#$%^&*()?+-_~=/]{6,20}$/,
	phone: /^01([016789]?)([0-9]{3,4})([0-9]{4})$/,
	tel: /^[0-9]{8,11}$/,
}

export const date = value => isEmpty(value) || !regEx.date.test(value) ? '유효하지 않은 날짜입니다.' : undefined
export const email = value => isEmpty(value) || !regEx.email.test(value) ? '유효하지 않은 이메일입니다.' : undefined
export const integer = value => !Number.isInteger(Number(value)) ? '정수가 아닙니다.' : undefined
export const maxLength = max => value => isEmpty(value) || value.length > max ? '길이가 허용치를 초과했습니다.' : undefined
export const minLength = min => value => isEmpty(value) || value.length < min ? '길이가 허용치 미만입니다.' : undefined
export const name = value => isEmpty(value) || !regEx.name.test(value) ? '유효하지 않은 이름입니다.': undefined
export const password = value => isEmpty(value) || !regEx.password.test(value) ? '유효하지 않은 비밀번호입니다.' : undefined
export const phone = value => isEmpty(value) || !regEx.phone.test(value) ? '유효하지 않은 휴대전화번호입니다.' : undefined
export const required = value => isEmpty(value) ? '유효하지 않습니다.' : undefined
export const tel = value => isEmpty(value) || !regEx.tel.test(value) ? '유효하지 않은 전화번호입니다.' : undefined