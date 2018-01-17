/**
 * @author       Stefan Herndlbauer <sherndlbauer@gorillabyte.com>
 * @copyright    2015-2018 Stefan Herndlbauer
 * @license      {@link https://github.com/Herndl/silverback.git/blob/master/README.md|MIT License}
 **/


// Export Silverback core
export * from './core';

// Import libs
import * as components from './components';
import * as systems from './systems';
import * as nodes from './nodes';


export {
    components,
    systems,
    nodes
};

// Always export Silverback globally.
window.Silverback = exports; // eslint-disable-line
