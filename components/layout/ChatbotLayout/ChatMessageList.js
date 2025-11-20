// components/chat/ChatMessageList.jsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MessageBubble from './MessageBubble';

export default function ChatMessageList({
  messages,
  listRef,
  onLayout,
  onContentSizeChange,
}) {
  const renderItem = ({ item }) => (
    <MessageBubble sender={item.sender} text={item.text} />
  );

  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
});
