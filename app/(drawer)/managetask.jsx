import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fallback from '../../components/fallback';
import { useTaskStats } from '../contexts/TaskContext';

const { width } = Dimensions.get('window');// Use the context function to update stats

const Managetask = () => {
    // Use context for task stats
    const { calculateAndSaveStats } = useTaskStats();

    // States for task management
    const [taskName, setTaskName] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterCompletion, setFilterCompletion] = useState('');

    // Add or update task
    const handleAddTask = () => {
        if (taskName.trim() === '') {
            alert('Please enter a task name.');
            return;
        }
        if (selectedValue === '') {
            alert('Please select a category.');
            return;
        }

        let updatedTasks;
        if (editTaskId) {
            updatedTasks = tasks.map((task) =>
                task.id === editTaskId
                    ? { ...task, name: taskName, category: selectedValue }
                    : task
            );
            setEditTaskId(null);
        } else {
            const newTask = {
                id: Date.now(),
                name: taskName,
                category: selectedValue,
                completed: false,
            };
            updatedTasks = [newTask, ...tasks];
        }

        setTasks(updatedTasks);
        setTaskName('');
        setSelectedValue('');
        calculateAndSaveStats(updatedTasks);
    };

    // Toggle task completion
    const handleToggleCompletion = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        calculateAndSaveStats(updatedTasks);
    };

    // Delete task
    const handleDelTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        calculateAndSaveStats(updatedTasks);
    };

    // Populate task details for editing
    const handleEditTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        setTaskName(taskToEdit.name);
        setSelectedValue(taskToEdit.category);
        setEditTaskId(id);
    };

    // Filter tasks based on category and completion
    const filteredTasks = tasks.filter((task) => {
        const categoryMatch = !filterCategory || task.category === filterCategory;
        const completionMatch =
            filterCompletion === '' ||
            task.completed === (filterCompletion === 'completed');
        return categoryMatch && completionMatch;
    });

    return (
        <View style={styles.container}>
            {/* Heading */}
            <View style={styles.card}>
                <Text style={styles.subheading}>Manage Tasks</Text>
            </View>

            <View style={styles.card}>
                {/* Input Area */}
                <View style={styles.row}>
                    <TextInput
                        placeholder="Enter Task"
                        placeholderTextColor="#6C757D"
                        style={styles.textbox}
                        value={taskName}
                        onChangeText={setTaskName}
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Category" value="" enabled={false} />
                            <Picker.Item label="Work" value="work" />
                            <Picker.Item label="Personal" value="personal" />
                            <Picker.Item label="Urgent" value="urgent" />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <Text style={styles.ButtonText}>
                        {editTaskId ? 'Update' : 'Add'}
                    </Text>
                </TouchableOpacity>

                {/* Filters */}
                <View style={styles.filterContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={filterCategory}
                            onValueChange={(itemValue) => setFilterCategory(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="All" value="" />
                            <Picker.Item label="Work" value="work" />
                            <Picker.Item label="Personal" value="personal" />
                            <Picker.Item label="Urgent" value="urgent" />
                        </Picker>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={filterCompletion}
                            onValueChange={(itemValue) => setFilterCompletion(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="All" value="" />
                            <Picker.Item label="Completed" value="completed" />
                            <Picker.Item label="Incomplete" value="incomplete" />
                        </Picker>
                    </View>
                </View>

                {/* Display Tasks */}
                <ScrollView style={styles.tasklist}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <View key={task.id} style={styles.taskbox}>
                                <Text style={styles.subheading}>
                                    {task.name.charAt(0).toUpperCase() +
                                        task.name.slice(1).toLowerCase()}
                                </Text>
                                <Text style={styles.priority}>
                                    {task.category.charAt(0).toUpperCase() +
                                        task.category.slice(1).toLowerCase()}
                                </Text>
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        onPress={() => handleToggleCompletion(task.id)}
                                        style={styles.checkbox}
                                    >
                                        <FontAwesome
                                            name={task.completed ? 'check-square' : 'square-o'}
                                            size={24}
                                            color={task.completed ? '#28A745' : '#1B3A7A'}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleEditTask(task.id)}
                                        style={styles.iconButton}
                                    >
                                        <FontAwesome name="edit" size={20} color="#1B3A7A" />
                                        <Text style={styles.iconText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDelTask(task.id)}
                                        style={[styles.iconButton, { marginLeft: 10 }]}
                                    >
                                        <FontAwesome name="trash" size={20} color="#1B3A7A" />
                                        <Text style={styles.iconText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Fallback />
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    filterButton: {
        backgroundColor: '#1B3A7A',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 5,
    },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginTop: 10,
    },
    filterButton: {
        backgroundColor: '#1B3A7A',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 5,
    },
    textbox: {
        backgroundColor: '#E3F0FF',
        borderRadius: 10,
        padding: 10,
        flex: 3,
        marginRight: 10,
        height: 50,
        color: '#000',
    },
    tasklist: {
        maxHeight: 450,
        minHeight: 160,
        marginTop: 20,
    },
    taskbox: {
        marginTop: 20,
        padding: 20,
        borderRadius: 16,
        alignItems: 'flex-start',
        backgroundColor: '#F8F9FA',
        width: width * 0.9,
        alignSelf: 'center',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        elevation: 3,
    },
    priority: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerContainer: {
        backgroundColor: '#E3F0FF',
        borderRadius: 10,
        paddingHorizontal: 5,
        flex: 3,
        height: 50,
        justifyContent: 'center', // Center align picker text
    },
    addButton: {
        backgroundColor: '#1B3A7A',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    ButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    iconText: {
        marginLeft: 5,
        color: '#1B3A7A',
        fontSize: 14,
    },
    statusText: {
        marginRight: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Aligns all elements properly
        width: '100%',
        paddingHorizontal: 10,
    },
    subheading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#343A40',
    },
    container: {
        flex: 1,
        backgroundColor: '#1B3A7A',
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : 16,
    },
    pickerContainer: {
        backgroundColor: '#E3F0FF',
        borderRadius: 10,
        paddingHorizontal: 5,
        flex: 3,
        height: 50,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        elevation: 6,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',

        width: '100%',
        marginVertical: 10,
    },
});

export default Managetask;
