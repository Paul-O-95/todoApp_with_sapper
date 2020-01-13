import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoSchema = new Schema({
    todo: {
        type: String,
        required: [true, 'Input is required']
    }
});
export default mongoose.model('todo', todoSchema);