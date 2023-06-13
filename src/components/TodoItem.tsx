import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type TodoItemProps = {
  item: Todo
  onTap: (id: number) => void
  onLongPress: (item: Todo) => void
}
function TodoItem({ item, onTap, onLongPress }: TodoItemProps) {
  useEffect(() => {
    console.log('TodoItem' + item.completed);
  });
  const itemTextStyle = item.completed ? styles.itemTextCompleted : styles.itemText;
  const containerStyle = item.completed ? styles.containerCompleted : styles.container;
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => onTap(item.id)}
      onLongPress={() => onLongPress(item)}
    >
      <Text style={itemTextStyle}>{item.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7DA453',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  containerCompleted: {
    backgroundColor: '#37474F',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
  itemTextCompleted: {
    fontSize: 16,
    color: '#808080',
    textDecorationLine: 'line-through',
  },
});

export default TodoItem