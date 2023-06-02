import { Link, TableRow, TableCell, Button } from '@aws-amplify/ui-react';
import { useNavigate } from "react-router-dom";


export default function Institution({ institution }) {
  const link = `/institution/${institution.item_id}`;
  const navigate = useNavigate();
  return (
    <TableRow>
      <TableCell>
        <Button onClick={() => navigate(link)}>{ institution.institution_name }</Button>
      </TableCell>
    </TableRow>
  )
}
