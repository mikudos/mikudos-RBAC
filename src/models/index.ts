import examples from './methods.model';
import { Application } from 'mikudos-node-app';

export = function(app: Application): void {
    app.context.models.examples = examples(app);
};
