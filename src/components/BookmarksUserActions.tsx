import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {userUserAction, UserAction, useTheme} from '../store';
import {MotiView as Box, MotiText as Text, AnimatePresence} from 'moti';

type BookmarksUserActionsProps = {
  handleAction: (action: UserAction) => void;
  userInput?: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
};
const USER_ACTIONS: UserAction[] = ['manage', 'search'];
export const BookmarksUserActions = ({
  handleAction,
  userInput,
  setUserInput,
}: BookmarksUserActionsProps) => {
  const {theme} = useTheme();
  const {getCurrentAction} = userUserAction();

  return (
    <>
      <Box style={styles.container}>
        {USER_ACTIONS.map(action => (
          <TouchableOpacity
            key={action}
            onPress={() => handleAction(action)}
            style={[
              styles.action,
              styles.unselectedAction,
              getCurrentAction() === action && styles.selectedAction,
            ]}>
            <Text style={[styles.title, {color: theme.colors.text}]}>
              {action}
            </Text>
          </TouchableOpacity>
        ))}
      </Box>
      {getCurrentAction() === 'search' && (
        <AnimatePresence>
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.colors.border, color: theme.colors.text},
            ]}
            value={userInput}
            onChangeText={setUserInput}
            placeholder={'Search Artist...'}
            placeholderTextColor={theme.colors.primary}
          />
        </AnimatePresence>
      )}
    </>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: theme.sizes.md,
    paddingVertical: theme.sizes.sm,
  },
  title: {
    fontSize: theme.sizes.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.sizes.md,
    borderRadius: theme.sizes.md,
  },
  unselectedAction: {
    opacity: 0.4,
  },
  selectedAction: {
    opacity: 1,
  },
  input: {
    marginVertical: theme.sizes.md,
    paddingHorizontal: theme.sizes.sm,
    borderRadius: theme.sizes.md,
    borderWidth: 1,
    height: theme.sizes['3xl'],
  },
});
