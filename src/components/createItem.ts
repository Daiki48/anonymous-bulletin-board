import { addDoc, collection } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

export const createItem = (inputText: string) => {
	if (inputText === '') {
		return;
	}

	const itemCollection = collection(db, 'bbs');
	const nowTime = new Date();
	const nowYear = nowTime.getFullYear();
	const nowMonth = nowTime.getMonth();
	const nowDay = nowTime.getDate();
	const nowHour = nowTime.getHours();
	const nowMin = nowTime.getMinutes();
	const nowSec = nowTime.getSeconds();
	const documentRef = addDoc(itemCollection, {
		itemText: inputText,
		timeStamp: `${nowYear}/${nowMonth}/${nowDay} ${nowHour}:${nowMin}:${nowSec}`,
	});

	// return documentRef;
};
