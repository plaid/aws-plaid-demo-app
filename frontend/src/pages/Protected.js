import { useState, useEffect } from 'react';
import { API, graphqlOperation, Logger } from 'aws-amplify';
import { View, Heading, Flex, Menu, MenuItem } from '@aws-amplify/ui-react';
import { getItems as GetItems } from '../graphql/queries';
import { getAccounts as GetAccounts } from '../graphql/queries';
import Plaid from '../components/Plaid';
import Institutions from '../components/Institutions';

const logger = new Logger("Protected");

export default function Protected() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const res = await API.graphql(graphqlOperation(GetItems));

      res.data.getItems.items.forEach((item) => {
        getAccounts(item.item_id)
      });
      setItems(res.data.getItems.items);
    } catch (err) {
      logger.error('unable to get items', err);
    }
  }

  const getAccounts = async (id) => {
    try {
      const res = await API.graphql(graphqlOperation(GetAccounts, { id }));
      res.data.getAccounts.forEach((account) => {
        console.log("Account Balance: "+account.balances.current);
      });
    } catch (err) {
      logger.error('unable to get accounts', err);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Flex direction="column">
      <Plaid getItems={getItems}/>
      {(items && items.length) ? (
        <View>
          <Heading>Institutions</Heading>
          <Institutions institutions={items}/>
        </View>
      ) : (<div/>)
      }
    </Flex>
  );
}
