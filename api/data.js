import { Router } from 'express';
let router = Router()

let data = [
    { "id": "1", "Firstname": "Jyri", "Surname": "Kemppainen" },
    { "id": "2", "Firstname": "Petri", "Surname": "Laitinen" }
]

router.get('/', (req, res) => {
    res.json( data )
})

router.get('/:id', (req, res) => {
    res.json( data.find(b => b.id === req.params.id ) )
})

router.post('/', (req, res) => {
        // Check if Content-Type is application/json
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ "error": "Unsupported Media Type" });
    }

    if( data.find(b => b.id === req.body.id)) {
        res.status(409).json( {"error": "record already exists"});
    } else {
        data = [...data, req.body];
        res.status(201).json( {"error": "record Created"});
         
    }
})

// New Route to delete  by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;  // Using string for id
    const index = data.findIndex(b => b.id === id);
    console.log(req);

    // Check if the item exists in the data array
    if (index !== -1) {
        // Remove the item from the array
        const deletedItem = data.splice(index, 1)[0];
        res.json(deletedItem);
    } else {
        // If the item is not found, send a 404 response
        res.status(404).json({ "error": "record not found !" });
    }
});


// PUT route to update or create data
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex(item => item.id === id);
    const updatedData = req.body;

    // Check if Content-Type is application/json
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ "error": "Unsupported Media Type" });
    }

    if (index !== -1) {
        // If the record exists, update it
        data[index] = { ...data[index], ...updatedData };
        res.status(200).json(data[index]);
    } else {
        // If the record doesn't exist, create it
        updatedData.id = id;
        
        data.push(updatedData);
        res.status(201).json(updatedData);
    }
});

export default router;