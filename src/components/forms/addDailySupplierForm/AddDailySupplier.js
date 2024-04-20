import React, { useState, useEffect } from 'react';
import API from '../../../Api';
import styles from './AddDailySupplier.moudle.css'; // Assume similar styling as CreateItem

function AddDailySupplier() {
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await API.get('/admin/get-all-item-quantities');
                const sortedItems = response.data.sort((a, b) => {
                    if (a.itemTypes === b.itemTypes) {
                        return a.itemTypesSpecifications.localeCompare(b.itemTypesSpecifications);
                    }
                    return a.itemTypes.localeCompare(b.itemTypes);
                });
                setItems(sortedItems);
                const initialQuantities = {};
                sortedItems.forEach(item => {
                 console.log("Name:"+item.name+"quantities:"+item.quantity)
                    // Initialize quantities for each item by its ID with its current quantity if available.
                    initialQuantities[item.id] = item.currentQuantity.toString();  // Convert to string for input field compatibility.
                });
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };
        fetchItems();
    }, []);

    const handleChange = (id, value) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: value  // Ensure that the update affects only the intended item.
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updates = items.map(item => ({
            itemName: item.name,
            quantity: parseInt(quantities[item.id], 10) || 0  // Convert to integer, default to 0 if NaN.
        }));
        
        try {
            const response = await API.post('/admin/addAllDailySupplier', updates);
            alert('All quantities updated successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Failed to update quantities:', error);
            alert('Failed to update quantities.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                {items.map(item => (
                    <div key={item.id} className={styles.itemRow}>
                        <span className={styles.itemName}>{item.name} ({item.itemTypes}, {item.itemTypesSpecifications})</span>
                        <input
                            type="number"
                            className={styles.quantityInput}
                            value={quantities[item.id] || ''}  // Bind the input to its corresponding quantity.
                            onChange={(e) => handleChange(item.id, e.target.value)}
                            placeholder="Enter quantity"
                        />
                    </div>
                ))}
                <button type="submit" className={styles.submitButton}>Submit All Quantities</button>
            </form>
        </div>
    );
}

export default AddDailySupplier;