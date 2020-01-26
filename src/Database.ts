import firebase from '@firebase/app';
import '@firebase/database'

export default class Database {
    private static instance: Database;
    fireDb: any;

    private constructor() {
        const firebaseApp = firebase.initializeApp({ databaseURL: "https://hacker-news.firebaseio.com" }, "hackernews");
        this.fireDb = firebase.database(firebaseApp);
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    getTopStories() {
        const db = this.fireDb;
        return new Promise(function (resolve, reject) {
            db.ref("v0/topstories").once("value", (s: any) => {
                const data = s.val() as any[];
                const stories = data.slice(0, 20).map(s => { return { id: parseInt(s) } });
                resolve(stories);
            });
        });
    }

    getStory(id: string) {
        const db = this.fireDb;
        return new Promise(function (resolve, reject) {
            db.ref("v0/item/" + id).once("value", (s: any) => {
                const dataStory = s.val();
                resolve({ id: dataStory.id, content: dataStory });
            });
        });
    }
}
