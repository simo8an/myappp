import { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import AppBar from "../screens/AppBar";

export default function TodoListScreen({ navigation }) {
  // Récupérer les tâches depuis Redux
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Initialiser les tâches UNE SEULE FOIS
  useEffect(() => {
    if (todos.length === 0) {
      dispatch(addTodo({ id: 1, title: "Faire les courses" }));
      dispatch(addTodo({ id: 2, title: "Sortir le chien" }));
      dispatch(addTodo({ id: 3, title: "Coder une app RN" }));
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* AppBar avec titre */}
      <AppBar title="Mes tâches" />

      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Détails", {
                  id: item.id,
                  title: item.title,
                })
              }
            >
              <Text style={{ padding: 10, fontSize: 18 }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}