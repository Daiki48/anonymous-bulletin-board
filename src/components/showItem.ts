import { getDoc, collection, doc } from 'firebase/firestore';

import { db } from '../FirebaseConfig';
import { Item } from './model';

export const showItem = () => {
	const itemCollection = collection(db, 'bbs');
	getDoc(itemCollection).then((query) => {
		const itemList: Item[] = [];
		let count: number = 0;
		query.docs.map((doc, index) => {
			const item: Item = {
				docId: doc.id,
				itemText: doc.data().itemText,
				timeStamp: doc.data({ serverTimestamps: 'estimate' }).timeStamp,
			};
			itemList.push(item);
			count += 1;
		});
		// setItemList(itemList);
	});
};
