function confirm_delete_email_mapping(){
    if(confirm("Do you want to delete this mapping?")){
        return true; 
    }
    else{
      return false;
    }
}

function update_op(ldap_id,op){
	$('#ldap_id').val(ldap_id);
	$('#op_action').val(op);
	
	if(op == "delete"){
		if(confirm("Do you want to delete this ldap settings?")){
        	$('#frm_update_op').submit();
    	}
   		else{
      		return false;
    	}
	}
	else{
		return true;
	}
}
