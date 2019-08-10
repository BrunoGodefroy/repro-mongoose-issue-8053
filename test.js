import mongoose from 'mongoose';


test('It should instantiate the admin', async () => {
  await mongoose.connect('mongodb://localhost:27017/gh8053', {
    promiseLibrary: Promise,
    useNewUrlParser: true,
  });
  const UserSchema = new mongoose.Schema({
    roles: [String],
  });

  const User = mongoose.model('User', UserSchema);

  const admin = new User({ roles: ['super-admin'] });
  await admin.save();

  expect(admin).not.toBe(null);
});
