import React, {useEffect, useState } from 'react';
import API from '../../../Api';
import styles from './CreateItem.module.css'; // Import the CSS module

function CreateItem() {
    const [itemData, setItemData] = useState({
        itemTypes: '',
        itemTypesSpecifications: '',
        name: '',
        description: '',
        imageURL: '',
        price: 0,
        pieces: 0,
        grams: 0
    });
    const [itemTypes, setItemTypes] = useState([]);
    const [itemSpecs, setItemSpecs] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const typesResponse = await API.get('/admin/get-item-types');
            const specsResponse = await API.get('/admin/get-item-special-types');
            const itemsResponse = await API.get('/admin/get-all-item');
            setItemTypes(typesResponse.data);
            setItemSpecs(specsResponse.data);
            setAllItems(itemsResponse.data.map(item => item.name.toLowerCase()));
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? Math.max(0, parseFloat(value)) : value;
        setItemData({ ...itemData, [name]: newValue });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting:'); 
        const { name, price, pieces, grams } = itemData;
    
        if (price <= 0 || pieces <= 0 || grams <= 0) {
            alert('Price, pieces, and grams must be greater than zero.');
            return;
        }
    
        if (allItems.includes(name.toLowerCase())) {
            alert('An item with this name already exists.');
            return;
        }
    
        setIsSubmitting(true);
        try {
            const response = await API.post('/admin/create-item', itemData);
            if (response.status === 200) {
                alert(response.data.message);  // Show success message from server
                console.log(response.data.data);  // Additional details if needed
            } else {
                alert('Failed to create item.');  // Fallback error message
            }
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Failed to create item.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>

        
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.labelField}>Item Name:</label>
                <input className={styles.inputField} type="text" name="name" id="name" value={itemData.name} onChange={handleChange} placeholder="Item Name" />

                <label htmlFor="description" className={styles.labelField}>Description:</label>
                <textarea className={styles.inputField} name="description" id="description" value={itemData.description} onChange={handleChange} placeholder="Description"></textarea>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="imageURL" className={styles.labelField}>Image URL:</label>
                <input className={styles.inputField} type="text" name="imageURL" id="imageURL" value={itemData.imageURL} onChange={handleChange} placeholder="Image URL" />

                <label htmlFor="price" className={styles.labelField}>Price:</label>
                <input className={styles.inputField} type="number" name="price" id="price" value={itemData.price} onChange={handleChange} placeholder="Price" />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="pieces" className={styles.labelField}>Pieces:</label>
                <input className={styles.inputField} type="number" name="pieces" id="pieces" value={itemData.pieces} onChange={handleChange} placeholder="Pieces" />

                <label htmlFor="grams" className={styles.labelField}>Grams:</label>
                <input className={styles.inputField} type="number" name="grams" id="grams" value={itemData.grams} onChange={handleChange} placeholder="Grams" />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="itemTypes" className={styles.labelField}>Item Type:</label>
                <select className={styles.selectField} name="itemTypes" id="itemTypes" value={itemData.itemTypes} onChange={handleChange}>
                    <option value="">Select Item Type</option>
                    {itemTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <label htmlFor="itemTypesSpecifications" className={styles.labelField}>Specification:</label>
                <select className={styles.selectField} name="itemTypesSpecifications" id="itemTypesSpecifications" value={itemData.itemTypesSpecifications} onChange={handleChange}>
                    <option value="">Select Specification</option>
                    {itemSpecs.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                    ))}
                </select>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.buttonSubmit}>Create Item</button>
            </form>
        </div>
    );
}

export default CreateItem;
