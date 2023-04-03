import { v4 as uuidv4 } from 'uuid';
import { IIdGenerator } from '../business/ports';

export class IdGenerator implements IIdGenerator{

    public generate(): string {
        return uuidv4()
    }
}
