import React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './index';

function ConfirmDialog({
	isOpen,
	cancelBtnText = 'No',
	confirmBtnText = 'Yes',
	onConfirm,
	onCancel,
}) {
	return (
		<AlertDialog open={isOpen}>
			<AlertDialogTrigger></AlertDialogTrigger>
			<AlertDialogTitle></AlertDialogTitle>
			<AlertDialogDescription></AlertDialogDescription>
			<AlertDialogContent className="max-w-72 min-w-64">
				<div className="text-center">
					<p className="text-2xl">Are You Sure?</p>
				</div>
				<div className="flex justify-center gap-4 mt-4">
					<Button onClick={onCancel} size="md" variant="blue">
						{cancelBtnText}
					</Button>
					<Button onClick={onConfirm} variant="destructive" size="md">
						{confirmBtnText}
					</Button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmDialog;
