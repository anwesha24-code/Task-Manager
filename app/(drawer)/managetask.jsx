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
    View
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fallback from '../../components/fallback';
const { width } = Dimensions.get('window');

const Managetask = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);

    // Add or update a task
    const handleAddTask = () => {
        if (taskName.trim() === "") {
            alert("Please enter a task name.");
            return;
        }
        if (selectedValue === "") {
            alert("Please select a priority.");
            return;
        }

        if (editTaskId) {
            // Update existing task
            const updatedTasks = tasks.map((task) =>
                task.id === editTaskId
                    ? { ...task, name: taskName, priority: selectedValue }
                    : task
            );
            setTasks(updatedTasks);
            setEditTaskId(null); // Reset edit mode
        } else {
            // Add new task
            const newTask = {
                id: Date.now(),
                name: taskName,
                priority: selectedValue,
            };
            setTasks([newTask, ...tasks]);
        }

        // Clear inputs
        setTaskName("");
        setSelectedValue("");
    };

    // Populate inputs for editing
    const handleEditTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        setTaskName(taskToEdit.name);
        setSelectedValue(taskToEdit.priority);
        setEditTaskId(id);
    };

    // Delete a task
    const handleDelTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <View style={styles.container}>
            {/* Heading */}
            <View style={styles.card}>
                <Text style={styles.subheading}>Manage Tasks</Text>
            </View>

            <View style={styles.card}>
                {/* Input area */}
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
                            <Picker.Item label="Priority" value="" enabled={false} />
                            <Picker.Item label="High" value="high" />
                            <Picker.Item label="Medium" value="medium" />
                            <Picker.Item label="Low" value="low" />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <Text style={styles.ButtonText}>
                        {editTaskId ? "Update" : "Add"}
                    </Text>
                </TouchableOpacity>

                {/* Display all tasks */}
                <ScrollView style={styles.tasklist}>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <View key={task.id} style={styles.taskbox}>
                                <Text style={styles.subheading}>
                                    {task.name.charAt(0).toUpperCase() + task.name.slice(1).toLowerCase()}
                                </Text>
                                <Text style={styles.priority}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}
                                </Text>
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => handleEditTask(task.id)} style={styles.iconButton}>
                                        <FontAwesome name="edit" size={20} color="#1B3A7A" />
                                        <Text style={styles.iconText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelTask(task.id)} style={[styles.iconButton, { marginLeft: 10 }]}>
                                        <FontAwesome name="trash" size={20} color="#1B3A7A" />
                                        <Text style={styles.iconText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        ))
                    ) : (
                        // Display when list is empty
                        <Fallback />
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textbox: {
        backgroundColor: '#E3F0FF',
        borderRadius: 10,
        padding: 10,
        flex: 3,
        marginRight: 10,
        height: 50,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
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
        fontSize: 16,
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

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        width: '100%',
        marginVertical: 10,
    },
});

export default Managetask;
