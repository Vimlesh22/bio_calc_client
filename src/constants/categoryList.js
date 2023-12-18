import logo from '../utils/transportation.jpeg';
import t4 from '../utils/t4.jpeg';
import agri from '../utils/agri.jpeg';

const categoriesList = {
    1: [
        { id: 1, title: "Biomass Calculator", path: "/biomass-calculator" },
        { id: 2, title: "Item 2", path: "" },
        { id: 3, title: "Item 3", path: "" },
        { id: 4, title: "Item 4", path: "" },
        { id: 5, title: "Item 5", path: "" },
        { id: 6, title: "Item 6", path: "" },
        { id: 7, title: "Item 7", path: "" },
        { id: 8, title: "Item 8", path: "" },
        { id: 9, title: "Item 9", path: "" }],
    2: [
        { id: 1, title: "Salinity Economics Tool", path: "" },
        { id: 2, title: "Item B", path: "" },
        { id: 3, title: "Item C", path: "" },
        { id: 4, title: "Item 4", path: "" },
        { id: 5, title: "Item 5", path: "" },
        { id: 6, title: "Item 6", path: "" },
        { id: 7, title: "Item 7", path: "" },
        { id: 8, title: "Item 8", path: "" },
        { id: 9, title: "Item 9", path: "" }],
    3: [
        { id: 1, title: "Item X", path: "" },
        { id: 2, title: "Item Y", path: "" },
        { id: 3, title: "Item Z", path: "" },
        { id: 4, title: "Item 4", path: "" },
        { id: 5, title: "Item 5", path: "" },
        { id: 6, title: "Item 6", path: "" },
        { id: 7, title: "Item 7", path: "" },
        { id: 8, title: "Item 8", path: "" },
        { id: 9, title: "Item 9", path: "" }],
};

const categories = [
    {
        id: 1,
        title: 'Crop Production Tools',
        imageUrl: logo, // Add the URL for the image
    },
    {
        id: 2,
        title: 'Category 2',
        imageUrl: t4, // Add the URL for the image
    },
    {
        id: 3,
        title: 'Category 3',
        imageUrl: agri, // Add the URL for the image
    },
];

export { categoriesList, categories };