const { ccclass, property } = cc._decorator;

export type Nullable<T> = T | null;

@ccclass
export default class ObjectPool<T extends cc.Component> {
    private prefab: cc.Prefab;
    private componentName: { new(...args: any[]): T };

    private pooledObjects: PooledObject<T>[] = [];

    constructor(prefab: cc.Prefab, defaultPoolCount: number, componentName: { new(...args: any[]): T }) {
        this.prefab = prefab;
        this.componentName = componentName;

        for (let i = 0; i < defaultPoolCount; i++) {
            this.createNew();
        }
    }

    public borrow(): Nullable<T> {
        let objectToBorrow = this.pooledObjects.find((o) => !o.isBorrowed());
        if (!objectToBorrow) {
            objectToBorrow = this.createNew();
        }

        return objectToBorrow.borrow();
    }

    public return(object: T): void {
        const objectToReturn = this.pooledObjects.find((o) => o.equals(object));
        if (!objectToReturn) {
            console.error("Object " + this.prefab.name + " is not a member of the pool");
            return;
        }

        objectToReturn.return();
    }

    private createNew(): PooledObject<T> {
        const newPooledObject = new PooledObject<T>(this.prefab, this.componentName);
        this.pooledObjects.push(newPooledObject);
        return newPooledObject;
    }
}

class PooledObject<T extends cc.Component> {
    private instancedComponent: Nullable<T>;
    private instancedNode: cc.Node;
    private borrowed: boolean = false;

    constructor(prefab: cc.Prefab, componentName: { new(...args: any[]): T }) {
        if(prefab === null) return
        this.instancedNode = cc.instantiate(prefab);
        this.instancedComponent = this.instancedNode.getComponent(componentName);

        if (!this.instancedComponent) {
            console.error("Object " + prefab.name + " does not have the component " + componentName.name);
        }

        this.clear();
    }

    public isBorrowed(): boolean {
        return this.borrowed;
    }

    public equals(component: T): boolean {
        return this.instancedComponent === component;
    }

    public borrow(): Nullable<T> {
        this.borrowed = true;
        return this.instancedComponent;
    }

    public return(): void {
        this.clear();
    }

    private clear(): void {
        this.instancedNode.removeFromParent();
        this.borrowed = false;
    }
}
