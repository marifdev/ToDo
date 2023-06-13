import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import TodoItem from './src/components/TodoItem';


function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    setActiveTodos(todos.filter((todo) => !todo.completed));
  }, [todos]);

  const setItemCompleted = (id: number) => {
    console.log('setItemCompleted' + id);
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo = () => {
    if (todoText.length != 0) {
      setTodos([...todos, { text: todoText, completed: false, id: todos.length + 1 }]);
      setTodoText('');
    }
  };

  const deleteTodo = (item: Todo) => {
    console.log('deleteTodo' + item.id);
    const newTodos = todos.filter((todo) => todo.id !== item.id);
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView >
        <View style={styles.contentContainer}>
          <View>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.header}>
              <Text style={styles.title}>Yapılacaklar</Text>
              <Text style={styles.title}>{activeTodos.length}</Text>
            </View>
            <FlatList
              data={todos}
              renderItem={({ item }) => <TodoItem
                item={item}
                onTap={() => setItemCompleted(item.id)}
                onLongPress={() => deleteTodo(item)} />}
            />
          </View>
          <View style={styles.addTodoContainer}>
            <TextInput
              placeholder={'Yapılacak...'}
              placeholderTextColor={'#808080'}
              value={todoText}
              onChangeText={(text) => setTodoText(text)}
              style={{
                color: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: '#808080',
                paddingVertical: 8,
                marginBottom: 8,
              }}
            />
            <TouchableHighlight
              onPress={addTodo}
              style={{ borderRadius: 8 }}>
              <View style={{ backgroundColor: todoText.length != 0 ? '#FFA500' : '#808080', padding: 8, borderRadius: 8 }}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Kaydet</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#102027',
    flexGrow: 1,
  },
  contentContainer: {
    padding: 16,
    flexGrow: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFA500',
    fontSize: 32,
    fontWeight: 'bold',
  },
  addTodoContainer: {
    backgroundColor: '#37474F',
    padding: 16,
    borderRadius: 8,
    bottom: 0,
    width: '100%',
  },
});

export default App;
