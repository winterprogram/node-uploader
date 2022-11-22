import { app } from './express';
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
