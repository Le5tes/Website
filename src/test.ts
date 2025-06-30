// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/sync-test'
import 'zone.js/dist/async-test'
import 'zone.js/dist/proxy'
import 'zone.js/dist/fake-async-test'
import 'zone.js/dist/mocha-patch';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
);
