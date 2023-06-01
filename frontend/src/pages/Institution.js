import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Divider, Flex, Heading, View, Tabs, TabItem } from '@aws-amplify/ui-react';
import Accounts from '../components/Accounts';
import Transactions from '../components/Transactions';

export default function Institution() {

  const { id } = useParams();

  const [accountMap, setAccountMap] = useState({});

  const updateAccounts = (accounts) => {
    const accountMap = accounts.reduce((acc, cur, idx) => {
      acc[cur.account_id] = cur;
      return acc;
    }, {});
    setAccountMap(accountMap);
  }

  return (
    <Flex direction="column">
      <Divider/>
      <Flex direction="row">
        <Heading level={5}>Institution</Heading>
      </Flex>
      <Tabs defaultIndex={1}>
    <TabItem title="Accounts">
    <Flex>
        <View>
          <Heading level={6}>Accounts</Heading>
          <Accounts id={id} updateAccounts={updateAccounts}/>
        </View>
    </Flex>  
    </TabItem>
    <TabItem title="Transactions">
    <Flex>
    <View>
          <Heading level={6}>Transactions</Heading>
          <Transactions id={id} accounts={accountMap}/>
        </View>
      </Flex>
    </TabItem>
  </Tabs>
    </Flex>
  );
}
