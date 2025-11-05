import * as controllActions from "./controllActions";
import * as templateActions from "./templatesActions";
import * as settingsActions from "./settingsActions";
import * as cellValuesActions from "./cellValuesActions";

export default {
    ...controllActions,
    ...templateActions,
    ...settingsActions,
    ...cellValuesActions
};
