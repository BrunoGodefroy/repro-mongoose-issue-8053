# Reproduction repository

Mongoose issue https://github.com/Automattic/mongoose/issues/8053


## Reproduction steps:

Assuming a running mongDB server on localhost:27017, run:

```
npm install
npm run jest
```

It should output the following:

```
 FAIL  ./test.js
  ✕ It should instantiate the admin (61ms)

  ● It should instantiate the admin

    ValidationError: User validation failed: roles: Cast to Array failed for value "[ 'super-admin' ]" at path "roles"

      13 |   const User = mongoose.model('User', UserSchema);
      14 |
    > 15 |   const admin = new User({ roles: ['super-admin'] });
         |                 ^
      16 |   await admin.save();
      17 |
      18 |   expect(admin).not.toBe(null);

      at new ValidationError (node_modules/mongoose/lib/error/validation.js:30:11)
      at model.Object.<anonymous>.Document.invalidate (node_modules/mongoose/lib/document.js:2317:32)
      at model.$set (node_modules/mongoose/lib/document.js:1112:10)
      at model._handleIndex (node_modules/mongoose/lib/document.js:877:14)
      at model.$set (node_modules/mongoose/lib/document.js:821:22)
      at model.Document (node_modules/mongoose/lib/document.js:124:12)
      at model.Model (node_modules/mongoose/lib/model.js:92:12)
      at new model (node_modules/mongoose/lib/model.js:4395:15)
      at Object.<anonymous> (test.js:15:17)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.318s, estimated 2s
Ran all test suites.
```

## Downgrading to mongoose 5.6.8 fixes the issue

```
npm install mongoose@5.6.8
npm run jest
```

It should output:

```
 PASS  ./test.js
  ✓ It should instantiate the admin (82ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.131s
Ran all test suites.
```

