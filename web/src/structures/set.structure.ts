import List from './list.structure';

export default class Set<T> extends List<T> {
    public push(item: T) {
        if (!this.contains(item)) this.list.push(item); 
    }
}