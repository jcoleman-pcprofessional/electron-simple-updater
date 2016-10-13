'use strict';

const { expect } = require('chai');
const normalizeOptions = require('rewire')('../../lib/normalize-options');


const makeBuildString        = normalizeOptions.__get__('makeBuildString');
const loadOptionsFromPackage = normalizeOptions.__get__('loadOptionsFromPackage');


describe('normalize-options lib', () => {
  beforeEach(() => {
    this.originalPlatform        = process.platform;
    this.originalArch            = process.arch;

    Object.defineProperty(process, 'platform',     { value: 'win32' });
    Object.defineProperty(process, 'arch',         { value: 'x64' });
  });

  afterEach(() => {

    Object.defineProperty(process, 'platform',     { value: this.originalPlatform });
    Object.defineProperty(process, 'arch',         { value: this.originalArch });
  });

  it('should make a build string', () => {
    expect(makeBuildString()).to.equal('win32-x64');

    process.mas = true;
    expect(makeBuildString()).to.equal('mas-x64');
    delete process.mas;
  });

  it('should read options from a package.json', () => {
    expect(loadOptionsFromPackage({}))
      .to.have.property('url', 'https://example.com/updates.json');

    expect(loadOptionsFromPackage({ url: '123' }))
      .to.have.property('url', '123');
  });
});